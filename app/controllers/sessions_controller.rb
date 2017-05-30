class SessionsController < ApplicationController
  def new
  end

  def create
    user = User.find_by(email: params[:session][:email].downcase)
    if user.nil?
      flash[:error] = "Invalid credentials."
      redirect_to login_path
    else
      session[:user_id] = user.id
      if user && user.authenticate(params[:session][:password])
        redirect_to root_path
      else
        redirect_to root_path
      end
    end
  end

  def destroy
    session.delete(:user_id)
    @current_user = nil
    redirect_to root_path
  end
end
