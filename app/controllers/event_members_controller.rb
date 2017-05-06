class EventMembersController < ApplicationController
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
