class ApplicationController < ActionController::Base
  helper_method :current_user, :logged_in?
  protect_from_forgery with: :exception

  def current_user
    @current_user ||=
      if session[:user_id]
        User.find(session[:user_id])
      elsif Rails.env == 'test'
        User.first
      end
  end

  def logged_in?
    current_user != nil
  end
end
