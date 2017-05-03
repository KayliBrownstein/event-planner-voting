class LocationsController < ApplicationController
  def new
    @event = Event.find(params[:event_id])
    @location = Location.new
  end

  def create
    @location = Location.new(locations_params)
    # @location.event_id = params[:event_id]
    @event = Event.find(params[:event_id])
    if @location.save
      redirect_to event_path(@event)
    else
      flash[:notice] = @location.errors.full_messages.join(", ")
      redirect_to event_path(@event)
    end
  end

  private

  def locations_params
    params.require(:location).permit(:user_id, :event_id, :name,
    :street_address, :city, :state, :description, :location_vote)
  end
end
