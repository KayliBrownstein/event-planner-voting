class EventsController < ApplicationController
  # before_action :authenticate_user!

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

  private

  def event_params
    params.permit(:name, :user_id, :cutoff_time, :description, :date, :time, :location)
  end
end
