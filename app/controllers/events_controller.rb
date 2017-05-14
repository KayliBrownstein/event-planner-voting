class EventsController < ApplicationController
  def edit
    @event = Event.find(params[:id])
    session[:ugid] = @event.id
    @invite = Invite.new
  end

  def update
    @event = Event.find(params[:id])
    @event.update(event_params)
    redirect_to event_path(@event)
  end

  private

  def event_params
    params.permit(:name, :user_id, :description, :cutoff_time)
  end
end
