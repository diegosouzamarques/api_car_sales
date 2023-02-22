
class userController {

  static allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  static userBoard = (req, res) => {
    res.status(200).send("User Content.");
  };
  
  static adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  
  static moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
  };

}

export default userController;