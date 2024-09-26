
const userRoutes={
    Login:"/auth/login",
    googleLogin:"auth/google-login",
    signup:"/auth/signup",
    veryfyOtp: "/auth/veryfy-otp",
    resendOtp:"/auth/resendotp",
    forgetPassword:"/auth/forgetPassword",
    veryfyOtpreset:"/auth/veryfyotpreset",
    resetPassword:"/auth/resetPassword",
    userLogout:"/auth/userLogout",
    searchMech:"/auth/serchMech",

    getProfile:"user/getProfile",
    booking:"/user/booking",
    fetchBookData:"/user/fetchBookData",
    updateProfle:"/user/updateProfle",

    allchat:"/user/chat/allUsers",

    fetchPayment:"/user/fetchPayment",
    checkOut:"/user/create-checkout-session",
    updatePaymnt:"user/update-payment-status",
    chekFeedback:"user/feedbackcheck",
    cretateFeedback:"user/feedback",
    fetchBlogs:"user/fetchblogs",
    fetchAllBlogs:"user/fetchallblogs",
    fetchAllService:"user/fetchAllService",
    fetchAllshop:"user/fetchAllshop",
    fetchFreelancersData:"user/fetchFreelancer",


}

export default userRoutes