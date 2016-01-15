class UsersController < ApplicationController

  def create
    if params[:user][:password] != params[:user][:password_confirmation]
      flash[:errors] = "password and password confirmation must match!"
      redirect_to login_path
    else
      user = User.new(user_params)
      if user.save
        session[:user_id] = user.id
        redirect_to session.delete(:return_to) || root_path
      else
        flash[:errors] = user.errors.full_messages.join(", ")
        redirect_to login_path
      end
    end
  end

  def show
    @user = User.find(params[:id])
  end

  private

  def user_params
    params.require(:user).permit(:first_name,
                                 :last_name,
                                 :email,
                                 :password,
                                 :password_confirmation)
  end

end
