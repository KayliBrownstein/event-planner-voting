require 'rails_helper'

describe Api::V1::LocationsController, type: :controller do
  describe 'GET /api/v1/events/locations' do
    let!(:location) do
      User.create(
        id: 1,
        username: "jarlax3",
        email: "jarlax3@launchacademy.com",
        password: 'password',
        first_name: 'Jar',
        last_name: 'Smith'
      )
      Event.create(
        id: 1,
        user_id: 1,
        name: "Birthday Party",
        description: 'This is a description. This is a description. This is a description. This is a description. This is a description. This is a description.',
        cutoff_time: "Monday"
      )
      Location.create(
        user_id: 1,
        event_id: 1,
        name: 'Picco',
        description: 'Pizza place',
        street_address: '153 Tremont Street',
        city: 'Boston',
        state: 'MA'
      )
    end

    it 'retrieves from database' do
      get :index, event_id: Event.first.id
      json = JSON.parse(response.body)

      expect(response.content_type).to eq('application/json')
      expect(response).to have_http_status(:ok)
    end
  end
end
