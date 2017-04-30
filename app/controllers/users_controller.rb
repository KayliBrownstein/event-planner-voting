class UsersController < ApplicationController
  def show
    @user = current_user
  end

  def new
    @user = User.new
    @token = params[:invite_token]
    session[:token] = @token
  end

  def create
    @user = User.new(user_params)
    if @user.save
      session[:user_id] = @user.id
      if session[:token] != nil
         org =  Invite.find_by_token(session[:token]).usergroup #find the user group attached to the invite
         @membership = Membership.new(user_id: current_user.id, usergroup_id: org.id)
         @membership.save
         flash[:notice] = "You joined the group you were invited to!"
      end
      flash[:notice] = "You have signed up successfully!"
      redirect_to events_path
    else
      render :new
    end
  end

  def destroy
    @user = User.find_by(id: current_user.id)
    @memberships = Membership.where(user_id: current_user.id)
    @memberships.each do |membership|
      membership.destroy
    end
    @preferences = Preference.where(user_id: current_user.id)
    @preferences.each do |preference|
      preference.destroy
    end
    @user.destroy
    redirect_to logout_path
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end
end
