class EventMembersController < ApplicationController
#
#   def invite_to
#     emails = params[:invite_emails].split(', ')
#     emails.each do |email|
#       invite = Invite.new(:sender_id => current_user.id, :email => email, event_member => @event_member.id)
#       if invite.save
#         if invite.recipient != nil
#           InviteMailer.existing_user_invite(invite).deliver
#         else
#           InviteMailer.new_user_invite(invite, new_user_registration_path(:invite_token => @invite.token))
#         end
#       end
#     end
#   end
# end

  def create
    event_member = EventMember.new(event_id: session[:ugid], user_id: current_user.id)
    session[:ugid] = nil
    event_member.save
    flash[:notice] = "Event made and joined successfully!"
    redirect_to events_path
  end

  def destroy
    @user = User.find(current_user.id)
    @event = session[:ugid]
    @event_members = EventMember.where(user_id: current_user.id, event_id: session[:ugid])
    @event_members.each do |event_member|
      event_member.destroy
    end
    redirect_to events_path
  end
end
