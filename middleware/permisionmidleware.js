exports.addUserData = (req, res, next) => {
    // Middleware menambahkan data user dummy.
    // Untuk memudahkan pengujian, kita menerima header `x-user-role` yang dapat
    // menimpa role default (mis. "admin") sehingga endpoint yang dibatasi admin
    // bisa diuji tanpa mengubah kode.
    console.log('Middleware: Menambahkan data user dummy...');
    const headerRole = req.headers && (req.headers['x-user-role'] || req.headers['X-User-Role']);
    req.user = {
        id: 123,
        nama: 'User Karyawan',
        role: headerRole ? String(headerRole).toLowerCase() : 'karyawan'
    };
    next();
};

exports.isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        console.log('Middleware: Izin admin diberikan.');
    next(); 
    } else {
        console.log('Middleware: Gagal! Pengguna bukan admin.');
        return res.status(403).json({ message: 'Akses ditolak: Hanya untuk admin'});
    }
};