class SessionsController < ApplicationController
  def new
    @token = params[:invite_token]
    session[:token] = @token
  end

  def create
    user = User.find_by(email: params[:session][:email].downcase)
    session[:user_id] = user.id
    if user && user.authenticate(params[:session][:password])
      invited_user_joins_group
      redirect_to event_members_path
    else
      flash[:danger] = 'Invalid email/password combination'
      redirect_to root_path
    end
  end

  def destroy
    session.delete(:user_id)
    @current_user = nil
    redirect_to root_path
  end

  private

  def invited_user_joins_group
    if session[:token] != nil
       org =  Invite.find_by_token(session[:token]).usergroup
       @membership = Membership.new(user_id: current_user.id, usergroup_id: org.id)
       @membership.save
       flash[:notice] = "You joined the group you were invited to!"
    end
  end
end
