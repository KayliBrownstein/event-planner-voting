class Api::V1::EventsController < ApplicationController
skip_before_filter :verify_authenticity_token

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def index
    @events = Event.where(user_id: @current_user.id)
    render json: @events
  end

  def new
    @event = Event.new
    render json: @event
  end

  def create
    if user_signed_in?
      @event = Event.create!(event_params)
      @event.user_id = current_user.id
      if @event.save!
        render json: @event
      end
    else
      flash[:error] = "Error"
    end
  end

  def show
    @user = current_user
    @event = Event.find(params[:id])
    @locations = @event.locations
    render json: @event
  end

  def destroy
    if user_signed_in?
      @event = Event.find(params[:id])
      @event.destroy
    end
  end

  private

  def event_params
    params.permit(:name, :user_id, :cutoff_time, :description, :date, :time, :location)
  end
end
