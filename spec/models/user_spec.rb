require 'rails_helper'

RSpec.describe User, type: :model do
  let(:user) do
    User.create(
      username: "jarlax3",
      avatar: "https://avatars2.githubusercontent.com/u/174825?v=3&s=400",
      email: "jarlax3@launchacademy.com",
      password: 'password',
      first_name: 'Jar',
      last_name: 'Smith'
    )
  end

  it 'is valid with valid attributes' do
    expect(user).to be_valid
  end

  it 'is not valid without a username' do
    user.username = nil
    expect(user).to_not be_valid
  end

  it 'is not valid without an email' do
    user.email = nil
    expect(user).to_not be_valid
  end

  it 'is not valid without a password' do
    user.password = nil
    expect(user).to_not be_valid
  end

  it 'is not valid without a first name' do
    user.first_name = nil
    expect(user).to_not be_valid
  end

  it 'is not valid without a last name' do
    user.last_name = nil
    expect(user).to_not be_valid
  end
end