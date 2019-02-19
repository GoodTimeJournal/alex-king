import React, { Component } from 'react';

//REDUX
import { connect } from 'react-redux';
import {
  deleteActivity,
  editActivity,
  getActivities,
  addActivity,
} from '../store/actions/activity';

//Activity Import
import Activities from '../components/Activities/activities';
import ActivityForm from '../components/Main/ActivityForm';

// STYLING
//Carousel import
import Slider from 'react-slick';
import styled from 'styled-components';

import ReactModal from 'react-modal';

const token = localStorage.getItem('token');

class ActivityView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      activities: [],
      activity: {
        name: '',
        fk: '',
        enjoymentRating: '',
        energyLevel: '',
        engagement: '',
      },
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentDidMount = () => {
    this.props.getActivities(token);
    this.setState({
      ...this.state,
      activity: {
        ...this.props.activeEdit,
        fk: parseInt(localStorage.getItem('id')),
      },
    });
  };

  // Modal Functions
  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }
  // Form Functions
  handleChange = e => {
    if (isNaN(e.target.value) || e.target.value === '') {
      this.setState({
        ...this.state,
        activity: {
          ...this.state.activity,
          [e.target.name]: e.target.value,
        },
      });
    } else
      this.setState({
        ...this.state,
        activity: {
          ...this.state.activity,
          [e.target.name]: parseInt(e.target.value),
        },
      });
  };

  handleSubmit = e => {
    const token = localStorage.getItem('token');
    e.preventDefault();
    this.props.isEditing // isEditing coming from Redux store
      ? this.props.updateActivity(token, this.state.activity)
      : this.props.addActivity(token, this.state.activity);
    this.handleCloseModal();
  };

  mapThroughActivities = activities => {
    let mappedActivities = activities.map(activity => (
      <Activities activity={activity} />
    ));
    return mappedActivities;
  };

  render() {
    return (
      <MainContainer>
        <Slider {...carouselSettings}>{displayCarouselImages()}</Slider>
        <ContentContainer>
          <h2>Activities</h2>
          <AddButtonContainer>
            <AddActivityButton onClick={this.handleOpenModal}>
              Add Activity
            </AddActivityButton>
            <ReactModal
              isOpen={this.state.showModal}
              contentLabel="Minimal Modal Example"
              style={{
                content: {
                  color: 'lightsteelblue',
                  height: '300px',
                  marginTop: `250px`,
                },
              }}
            >
              <IconContainer>
                <i class="fas fa-times" onClick={this.handleCloseModal} />
              </IconContainer>
              <ActivityForm
                name={this.state.activity.name}
                enjoymentRating={this.state.activity.enjoymentRating}
                energyLevel={this.state.activity.energyLevel}
                engagement={this.state.activity.engagement}
                timestamp={this.state.activity.timestamp}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                isEditing={this.props.isEditing}
              />
            </ReactModal>
          </AddButtonContainer>
          <ActivityContainer>
            {this.mapThroughActivities(this.props.activities)}
          </ActivityContainer>
        </ContentContainer>
      </MainContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.activity.isLoading,
    activeEdit: state.activity.activeEdit,
    activities: state.activity.activities,
    isEditing: state.activity.isEditing,
  };
};

export default connect(
  mapStateToProps,
  {
    addActivity,
    deleteActivity,
    editActivity,
    getActivities,
  }
)(ActivityView);

const MainContainer = styled.div`
  max-width: 100%;
`;

//Carousel Styling
const CarouselImageContainer = styled.div`
  margin: 0 auto;
  display: flex
  margin-top: 72px;
  max-width: 100%;
`;

const CarouselImage = styled.img`
  max-width: 100%;
  height: auto;
  min-height: 200px;
`;

//Activity Styling
const ContentContainer = styled.div`
  padding: 3rem 10rem;
  h2 {
    font-weight: lighter;
    font-size: 3.4rem;
    text-align: center;
  }
`;

const AddButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const AddActivityButton = styled.a`
  margin-top: 1rem;
  display: inline-block;
  line-height: 2.7em;
  padding: 0 1.5em 0 1.5em;
  border-radius: 14px;
  text-decoration: none;
  font-weight: 600;
  border: solid 1px #dee0e3;
  font-size: 1.6rem;
  width: 15rem;
  text-align: center;
  white-space: nowrap;
  font-weight: light;
  cursor: pointer;
  :hover {
    border-color: #9932cc;
    color: #9932cc;
  }
`;
const ActivityContainer = styled.div`
  margin: 0 auto;
  margin-top: 2rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 750px;
`;
const IconContainer = styled.div`
  text-align: right;
  i {
    font-size: 24px;
    cursor: pointer;
  }
`;

//Settings for carousel
let carouselSettings = {
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
};

//Maps through images and returns a component for each image.
const displayCarouselImages = () =>
  carouselImages.map(image => {
    return (
      <CarouselImageContainer>
        <CarouselImage src={image} />
      </CarouselImageContainer>
    );
  });

//Images - Resolution size: 1440x300
let carouselImages = [
  'https://images.unsplash.com/photo-1548161126-7b079975fa76?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1440&h=300&fit=crop&ixid=eyJhcHBfaWQiOjF9',
  'https://images.unsplash.com/photo-1547843697-11484584526e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1440&h=300&fit=crop&ixid=eyJhcHBfaWQiOjF9',
  'https://images.unsplash.com/photo-1547958600-915c8a5131de?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1440&h=300&fit=crop&ixid=eyJhcHBfaWQiOjF9',
  'https://images.unsplash.com/photo-1549138159-22f90358cea0?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1440&h=300&fit=crop&ixid=eyJhcHBfaWQiOjF9',
];

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
});
