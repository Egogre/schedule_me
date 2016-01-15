class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :current_user

  def authenticate_user
    session[:return_to] ||= request.referer
    redirect_to "/login" unless current_user
  end

  def current_user
    User.find(session[:user_id]) if session[:user_id]
  end

end
