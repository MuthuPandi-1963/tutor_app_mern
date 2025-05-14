import jwt from 'jsonwebtoken';
import UserModel from '../../models/user.js';

const refreshAuth = async (req, res) => {
  try {
    console.log(req.cookies);
    
    const { token } = req.cookies;

    // 1. Check if refresh token exists
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    // 2. Verify the token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    console.log(decoded);
    

    // 3. Find the user from the decoded token
    const user = await UserModel.findById(decoded.userId || decoded.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 4. Generate new access token
    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '15m' } // Adjust as needed
    );

    // 5. Optionally generate a new refresh token too (rotate strategy)
    // const newRefreshToken = jwt.sign(
    //   { id: user._id },
    //   process.env.REFRESH_TOKEN_SECRET,
    //   { expiresIn: '7d' }
    // );
    // res.cookie('token', newRefreshToken, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === 'production',
    //   sameSite: 'Strict',
    //   maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    // });

    // 6. Send new access token
    console.log(user);
    
    res.json({
      message: 'Token refreshed',
      accessToken,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified : user.isVerified,
        profileImg : user.profileUrl
      },
      success : true
    });

  } catch (err) {
    console.error('Error in refreshAuth:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export default refreshAuth;
