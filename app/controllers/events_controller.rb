class EventsController < ApplicationController

  def index
    @events = Event.all
    @user = current_user
  end

  def show
    @user = current_user
    @event = Event.find(params[:id])
  end

  def destroy
    @event = Event.find(params[:id])
    @event.destroy
    redirect_to events_path
  end
end
