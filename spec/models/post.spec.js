require("../mongodb_helper");
var Post = require("../../models/post");

describe("Post model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.posts.drop(() => {
      done();
    });
  });

  it("has a message", () => {
    var post = new Post({ message: "some message" });
    expect(post.message).toEqual("some message");
  });

  it("has a user ID", () => {
    let user = { _id: "some-id" };
    var post = new Post({ message: "some message",
                         user_id: user._id });
    expect(post.user_id).toEqual(user._id);
  });

  it("has the time of post creation", () => {
    const mockDateObject = new Date("2022-04-20T13:33:42.767Z")
    const spy = jest
    .spyOn(global, 'Date')
    .mockImplementation(() => mockDateObject)

    var post = new Post({ message: "some message"})
    
    spy.mockRestore()

    expect(post.createdAt).toEqual(new Date("2022-04-20T13:33:42.767Z"))
  });

  it("can list all posts", (done) => {
    Post.find((err, posts) => {
      expect(err).toBeNull();
      expect(posts).toEqual([]);
      done();
    });
  });

  it("can save a post", (done) => {
    var post = new Post({ message: "some message" });

    post.save((err) => {
      expect(err).toBeNull();

      Post.find((err, posts) => {
        expect(err).toBeNull();

        expect(posts[0]).toMatchObject({ message: "some message" });
        done();
      });
    });
  });
});