class Api::V1::EventsController < ApplicationController
  def index
    @events = Event.all
    render json: @events
  end

  def create
      @event = Event.create!(event_params)
      @event.user_id = current_user.id
      if @event.save!
        render json: @event
      end
  end

  def show
    @user = current_user
    @event = Event.find(params[:id])
    render json: @event
  end

  def destroy
    if user_signed_in?
      @event = Event.find(params[:id])
      @event.destroy
    end
  end
end
