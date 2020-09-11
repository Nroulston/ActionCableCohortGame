require 'test_helper'

class GameRoomsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @game_room = game_rooms(:one)
  end

  test "should get index" do
    get game_rooms_url, as: :json
    assert_response :success
  end

  test "should create game_room" do
    assert_difference('GameRoom.count') do
      post game_rooms_url, params: { game_room: { name: @game_room.name } }, as: :json
    end

    assert_response 201
  end

  test "should show game_room" do
    get game_room_url(@game_room), as: :json
    assert_response :success
  end

  test "should update game_room" do
    patch game_room_url(@game_room), params: { game_room: { name: @game_room.name } }, as: :json
    assert_response 200
  end

  test "should destroy game_room" do
    assert_difference('GameRoom.count', -1) do
      delete game_room_url(@game_room), as: :json
    end

    assert_response 204
  end
end
