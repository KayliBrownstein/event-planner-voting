class Api::V1::LocationsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @event = Event.find(params[:event_id])
    @locations = @event.locations
    @user = current_user
    render :json => @locations.to_json(:methods => :vote_count)
    # pass down vote_count method for use in React AllLocations component 
  end

  def show
    @user = current_user
    @location = Location.find(params[:id])
    @location_votes = @location.location_votes
    render json: @location_votes
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

  private

  def location_params
    params.require(:location).permit(:id, :name, :user_id, :event_id,
      :description, :street_address, :city, :state)
  end
end
