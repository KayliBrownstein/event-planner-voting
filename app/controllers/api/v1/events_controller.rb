class Api::V1::EventsController < ApplicationController
skip_before_filter :verify_authenticity_token

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def index
    @current_user = current_user
    @events = Event.where(user_id: @current_user.id)
    render json: @events
  end

  def new
    @event = Event.new
    render json: @event
  end

  def create
      @event = Event.create!(event_params)
      @event.user_id = current_user.id
      if @event.save!
        render json: @event
      else
        flash[:error] = "Error"
      end
  end

  def show
    @user = current_user
    @event = Event.find(params[:id])
    @locations = @event.locations
    @datetimes = @event.datetimes
    render json: @event
  end

  def edit
    @event = Event.find(params[:id])
    render :update
  end

  def update
    @event = Event.find(params[:id])
    @event.update(event_params)
    redirect_to edit_event_path(@event)
  end

  def destroy
      @event = Event.find(params[:id])
      @event.destroy
  end

  private

  def event_params
    params.require(:event).permit(:name, :user_id, :cutoff_time, :description, :suggested_date, :suggested_time, :suggested_location)
  end
end
