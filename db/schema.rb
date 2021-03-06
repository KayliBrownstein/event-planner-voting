# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170530034838) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "datetime_votes", force: :cascade do |t|
    t.integer  "datetime_id"
    t.boolean  "upvote",      default: false
    t.boolean  "downvote",    default: false
    t.integer  "user_id"
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.index ["datetime_id"], name: "index_datetime_votes_on_datetime_id", using: :btree
    t.index ["user_id"], name: "index_datetime_votes_on_user_id", using: :btree
  end

  create_table "datetimes", force: :cascade do |t|
    t.string   "date",       null: false
    t.string   "time",       null: false
    t.integer  "user_id"
    t.integer  "event_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "event_members", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "event_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "events", force: :cascade do |t|
    t.string   "name",        null: false
    t.text     "description", null: false
    t.string   "cutoff_time", null: false
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "invites", force: :cascade do |t|
    t.string   "email"
    t.integer  "sender_id"
    t.integer  "recipient_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "event_id",     null: false
  end

  create_table "location_votes", force: :cascade do |t|
    t.integer  "location_id"
    t.boolean  "upvote",      default: false
    t.boolean  "downvote",    default: false
    t.integer  "user_id"
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.index ["location_id"], name: "index_location_votes_on_location_id", using: :btree
    t.index ["user_id"], name: "index_location_votes_on_user_id", using: :btree
  end

  create_table "locations", force: :cascade do |t|
    t.string   "name",           null: false
    t.string   "street_address", null: false
    t.string   "city",           null: false
    t.string   "state",          null: false
    t.text     "description",    null: false
    t.integer  "user_id"
    t.integer  "event_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: :cascade do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "username"
    t.string   "email"
    t.string   "password_digest"
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
    t.boolean  "admin",           default: false
    t.string   "avatar"
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
  end

end
