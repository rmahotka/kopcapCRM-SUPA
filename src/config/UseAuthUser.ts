import { user, supabase } from '@/config/supabase'

export default function useAuthUser() {
  /**
   * Login with email and password
   */

  const login = async ({ valueLogin, valuePassword }) => {
    const { user, error } = await supabase.auth.signInWithPassword({
      email: valueLogin,
      password: valuePassword
    })
    if (error) throw error

    return user
  }

  /**
   * Logout
   */
  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    location.reload()
    if (error) throw error
  }

  /**
   * Check if the user is logged in or not
   */
  const isLoggedIn = () => {
    console.log(user.value)

    return !!user.value
  }

  /**
   * Register
   */
  const register = async ({ valueMail, valuePassword, ...meta }) => {
    const { user, error } = await supabase.auth.signUp(
      {
        email: valueMail,
        password: valuePassword
      },
      {
        data: meta
      }
    )
    if (error) throw error
    return user
  }

  /**
   * Update user email, password, or meta data
   */
  const update = async (data) => {
    const { user, error } = await supabase.auth.update(data)
    if (error) throw error
    return user
  }

  /**
   * Send user an email to reset their password
   * (ie. support "Forgot Password?")
   */
  const sendPasswordRestEmail = async (valueLogin) => {
    const { user, error } = await supabase.auth.resetPasswordForEmail(valueLogin)
    if (error) throw error
    return user
  }

  return {
    user,
    login,
    isLoggedIn,
    logout,
    register,
    update,
    sendPasswordRestEmail
  }
}
