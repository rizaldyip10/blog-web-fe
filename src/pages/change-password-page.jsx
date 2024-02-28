import { useContext, useRef } from "react"
import { Toaster, toast } from "react-hot-toast"
import AnimationWrapper from "../common/page-animation"
import InputBox from "../components/inputBox"
import axios from "axios"
import { UserContext } from "../App"

const ChangePassword = () => {

    let { userAuth: { access_token } } = useContext(UserContext)

    let changePasswordForm = useRef()

    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    const handleSubmit = (e) => {
        e.preventDefault()

        let form = new FormData(changePasswordForm.current)
        let formData = {}

        for (let [key, value] of form.entries()) {
            formData[key] = value
        }

        let { currentPassword, newPassword } = formData

        if (!currentPassword.length || !newPassword.length) {
            return toast.error("Please fill your current and new password")
        }
        if (!passwordRegex.test(currentPassword) || !passwordRegex.test(newPassword)) {
            return toast.error("Please enter minimal 1 numeric, 1 lowercase, and 1 uppercase letter")
        }

        e.target.setAttribute("disabled", true)

        let loadingToast = toast.loading("Loading...")

        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/change-password", formData, {
            headers: {
                Authorization: `Bearer ${ access_token }`
            }
        })
        .then(() => {
            toast.dismiss(loadingToast)
            e.target.removeAttribute("disabled")
            return toast.success("Password updated")
        })
        .catch(({ response }) => {
            toast.dismiss(loadingToast)
            e.target.removeAttribute("disabled")
            return toast.error(response.data.error)
        })
    }

    return (
        <AnimationWrapper>
            <Toaster />
            <form ref={changePasswordForm}>

                <h1 className="max-md:hidden">Change Password</h1>

                <div className="py-10 w-full md:max-w-[400px]">
                    <InputBox 
                        name="currentPassword" 
                        type="password" 
                        className="profile-edit-input"
                        placeholder="Current Password"
                        icon="fi fi-rr-unlock"
                    />
                    <InputBox 
                        name="newPassword" 
                        type="password" 
                        className="profile-edit-input"
                        placeholder="New Password"
                        icon="fi fi-rr-unlock"
                    />

                    <button
                        className="btn-dark px-10"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Change Password
                    </button>
                </div>

            </form>
        </AnimationWrapper>
    )
}

export default ChangePassword