class EventMembersController < ApplicationController

  def invite_to
    emails = params[:invite_emails].split(', ')
    emails.each do |email|
      invite = Invite.new(:sender_id => current_user.id, :email => email, event_member => @event_member.id)
      if invite.save
        if invite.recipient != nil
          InviteMailer.existing_user_invite(invite).deliver
        else
          InviteMailer.new_user_invite(invite, new_user_registration_path(:invite_token => @invite.token))
        end
      end
    end
  end
end
