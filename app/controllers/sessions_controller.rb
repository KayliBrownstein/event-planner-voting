class SessionsController < ApplicationController
  def new
    @token = params[:invite_token]
    session[:token] = @token
  end

  def create
    user = User.find_by(email: params[:session][:email].downcase)
    if user.nil?
      flash[:error] = "Invalid credentials."
      redirect_to login_path
    else
      session[:user_id] = user.id
      if user && user.authenticate(params[:session][:password])
        invited_user_joins_event
        redirect_to root_path
      else
        # flash[:danger] = 'Invalid email/password combination'
        redirect_to root_path
      end
    end
  end

  def destroy
    session.delete(:user_id)
    @current_user = nil
    redirect_to root_path
  end

  private

  def invited_user_joins_event
    if session[:token] != nil
       org =  Invite.find_by_token(session[:token]).event_id
       @event_member = EventMember.new(user_id: current_user.id, event_id: org.id)
       @event_member.save
       flash[:notice] = "You joined the event you were invited to!"
    end
  end
end
