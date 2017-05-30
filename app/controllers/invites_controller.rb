class InvitesController < ApplicationController
  def new
    @event_id = params[:id]
    @invite = Invite.new
  end

  def create
    @invite = Invite.new(invite_params)
    recipient = User.find_by(email: @invite.email)
    @invite.sender_id = current_user.id

    if @invite.save
      if recipient.nil?
       InviteMailer.new_user_invite(@invite).deliver_now
       flash[:notice] = "Invite Sent"
       redirect_to events_path
      else
        InviteMailer.returning_user_invite(@invite).deliver_now
        flash[:notice] = "Invite Sent"
        redirect_to events_path
      end
    else
      flash[:notice] = "Invite Did NOT Send. Please provide an email address."
      redirect_to events_path
    end
  end

  private

  def invite_params
    params.require(:invite).permit(:event_id, :email)
  end
end
