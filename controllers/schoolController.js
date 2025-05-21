import pool from '../db.js'

const validateFields = (name, address, latitude, longitude) => {
    if(!name || !address, !latitude, !longitude) {
        return false;
    }
    return true;
}

export const addSchool = async (req, res) => {
    const { name, address, latitude, longitude } = req.body;

    if(!validateFields(name, address, latitude, longitude)) {
        return res.status(400).json({ message: "Input Error. Enter all Fields"});
    }

    try {
        const school = await pool.execute(
            'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
            [name, address, latitude, longitude]
        )
        res.status(201).json({ message: "School added successfully"})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const calculateDistance = (lat1, long1, lat2, long2) => {
    const toRad = angle => (angle * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLong = toRad(long2 - long1);
    const a = 
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLong / 2) ** 2;
    const c = 2 * Math.atan(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

export const listSchools = async (req, res) => {
    const userLat = parseFloat(req.query.latitude);
    const userLon = parseFloat(req.query.longitude);

    if(isNaN(userLat) || isNaN(userLon)) {
        return res.status(400).json({ error: 'Invalid latitude or longitude' });
    }

    try {
        const [schools] = await pool.execute('SELECT * FROM schools');
        const schoolsWithDistance = schools.map((school) => ({
            ...school,
            distance: calculateDistance(userLat, userLon, school.latitude, school.longitude)
        }));
        schoolsWithDistance.sort((a, b) => a.distance - b.distance);
        res.status(500).json(schoolsWithDistance);
    } catch(error) {
        res.status(500).json({ message: error.message});
    }
}