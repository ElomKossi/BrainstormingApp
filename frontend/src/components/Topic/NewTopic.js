import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import {List} from 'immutable';
import { Button, Form  } from 'react-bootstrap';

import { createTopic } from '../../actions/topic';

class NewThread extends Component {
    constructor(props) {
        super(props);
        const {name, description} = this.props;
        this.state = {
            name,
            description
        }
    }

    static getDerivedStateFromProp(newProps) {
        const {name: newName, content: newDescription} = newProps;
        this.setState({
          name: newName,
          description: newDescription,
        });
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    isFormValid = () => {
        const {name} = this.state;
        return name;
      };

    onSubmit = (e) => {
        e.preventDefault();
        if (this.isFormValid()) {
            const {name, description} = this.state;
            let newThread = {
              name: name,
              description: description
            };
            createTopic(newThread);
          }
    }

    render() {
        const {
            isAuthenticated,
            isLoading,
            success,
            id,
            error,
            showEditor,
        } = this.props;
        const {name, description} = this.state;

        if (isAuthenticated)
            return <Redirect to='/' />;

        return(
            <Form onSubmit={ e => onSubmit()}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control placeholder="The topic's name" value={name} onChange={e => onChange(e)}/>
                </Form.Group>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control as="textarea" placeholder="The topic's description" value={description} onChange={e => onChange(e)}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.topic
    //userData: state.auth.user
});

export default connect(mapStateToProps, { createTopic })(NewThread);