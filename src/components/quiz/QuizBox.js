import React, { Component } from "react";
// reactstrap components
import {
  Jumbotron,
  Button,
  FormGroup,
  Form,
  Input,
  Container,
  Label,
  Col,
  Badge
} from "reactstrap";
import "./quiz.css"

export default class QuizBox extends Component {

  state = {
    inputAnswer: "",
    correctAnswers: 0,
    totalQuestions: 0,
    hasAnswered: false,
    disablePlayButton: false,
    disableSubmitButton: true
}

  componentDidMount() {
    this.props.handleStart()
  }



// handle the field change when the input box is edited
handleFieldChange = event => {
    const stateToChange = {}
    stateToChange[event.target.id] = event.target.value
    this.setState(stateToChange)
}

handleSubmit = event => {
    // prevent the page from going to another page
    if (!this.state.hasAnswered) {
    this.setState({totalQuestions: this.state.totalQuestions + 1, disablePlayButton:false})
    this.toggle("hasAnswered");
    event.preventDefault();
    if (this.state.inputAnswer === "") {
      alert("Please enter an answer!")
    }
      else {
        let inputAnswer= this.state.inputAnswer.toLowerCase();
        let correctAnswer = this.props.currentTrack.toLowerCase();
        if (correctAnswer.includes(inputAnswer) && inputAnswer.length >= 3) {
        this.setState({correctAnswers: this.state.correctAnswers + 1})
        alert("Correct")
        let form = event.target.parentNode;
        form.reset();
      } else {
        alert(`Sorry, the correct answer is ${this.props.currentTrack}`)
        let form = event.target.parentNode;
        form.reset();
      }
    }
   } else {
      alert("Play the next song!")
    }

    }



    toggle = (stateToToggle) => {
      this.setState({
        [stateToToggle]: !this.state[stateToToggle]
      })
    }

    playSong = () => {
      if (this.state.hasAnswered) {
        this.toggle("disablePlayButton")
        this.props.handlePlay();
        this.setState()
        this.toggle("hasAnswered");
      } else {
        alert("Please submit an answer.")
      }
    }



  render() {
    return (
      <Container>
        <Jumbotron>
          <h2 className="display-4">Quiz Time</h2>
          <p className="lead">Click the play button to test your skills!</p>
          <hr className="my-2" />
          <Button onClick={this.playSong} disabled={this.state.disablePlayButton}>Play song!
          </Button>
          <Badge>{this.state.correctAnswers}</Badge>

          
          <Form >
          <FormGroup row>
          <Label for="inputAnswer" sm={3}>What song is this?</Label>
          <Col sm={9}>
            <Input type="text" onChange={this.handleFieldChange} name="text" id="inputAnswer" placeholder="Enter your guess!" />
          </Col>
          </FormGroup>
          <Button onClick={this.handleSubmit}>Submit</Button>
        </Form>

        </Jumbotron>
      </Container>
    );
  }
}