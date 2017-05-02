class Api::V1::LocationsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @event = Event.find(params[:event_id])
    @locations = @event.locations
    render json: @locations
    @user = current_user
  end

  def create
    @location = Location.new(location_params)
    @location.user_id = current_user.id
    @event = Event.find(params[:event_id])
    @location.event = @event
    if @location.save!
      render json: @location
    end
  end

  def edit
    @location = Location.find(params[:id])
  end

  def update
    @location = Location.find(params[:id])
    @location.update(location_params)
    if @location.save!
      render json: @location
    end
  end

  private

  def location_params
    params.permit(:id, :name, :user_id, :event_id, :description, :street_address, :city, :state)
  end

end
