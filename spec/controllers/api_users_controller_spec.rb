require 'rails_helper'

describe Api::V1::UsersController, type: :controller do
  describe 'GET /api/v1/users' do
    let(:user) do
      User.create(
        id: 1,
        username: "jarlax3",
        email: "jarlax3@launchacademy.com",
        password: 'password',
        first_name: 'Jar',
        last_name: 'Smith'
      )
    end

    it 'retrieves from database' do

      get :index, user_id: user.id
      json = JSON.parse(response.body)

      expect(response.content_type).to eq('application/json')
      expect(response).to have_http_status(:ok)
    end
  end
end
