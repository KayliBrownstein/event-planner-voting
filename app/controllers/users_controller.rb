class UsersController < ApplicationController

  # def index
  #   @users = User.all
  #   @current_user = current_user
  #   render json: @current_user
  # end

  # def show
  #   @user = current_user
  # end

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
         org =  Invite.find_by_token(session[:token]).event
         @event_member = EventMember.new(user_id: current_user.id, event_id: org.id)
         @event_member.save
         flash[:notice] = "You joined the event you were invited to!"
      end
      flash[:notice] = "You have signed up successfully!"
      redirect_to events_path
    else
      render :new
    end
  end

  def destroy
    @user = User.find_by(id: current_user.id)
    @event_members = EventMember.where(user_id: current_user.id)
    @event_members.each do |event_member|
      event_member.destroy
    end
    @user.destroy
    redirect_to logout_path
  end

  private

  def user_params
    params.require(:user).permit(:username, :first_name, :last_name, :email, :password, :password_confirmation)
  end
end
