import React from "react";
import styled from "styled-components";
import { Query, Mutation } from "react-apollo";
import { PROFILE, EDIT_PROFILE } from "../../sharedQueries";
import { sizes } from "../../config/_mixin";
import Upload from "../../Components/Upload";
import { toast } from "react-toastify";

const ProfileContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px 10px;
`;

const ProfileInnerContainer = styled.div`
  width: ${`${sizes.desktop}px`};
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
`;

const ProfileInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const ProfileTextInfoContainer = styled.div`
  width: 600px;
`;

const ProfileTitle = styled.div`
  font-size: 40px;
  font-weight: 100;
  padding-bottom: 15px;
  border-bottom: 0.5px solid white;
  margin-bottom: 30px;
`;

const ProfileSubTitle = styled.div`
  font-size: 15px;
  color: grey;
  padding: 10px 0px;
`;

const ProfileSubTitleData = styled.div`
  padding: 10px 0;
  height: 50px;
  font-size: 20px;
  color: white;
  font-weight: bolder;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProfilePhotoHoverContainer = styled.div`
  font-size: 20px;
  z-index: 2;
  position: absolute;
  display: flex;
  top: 41%;
  left: 43%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  transition: opacity 0.5s ease;
  opacity: 0;
`;

const ProfileImgContainer = styled.div`
  position: relative;
  &:hover {
    ${ProfilePhotoHoverContainer} {
      opacity: 1;
    }
  }
`;

interface IProfileImgProps {
  url: string;
}

const ProfileImg = styled<IProfileImgProps, any>("div")`
  width: 200px;
  height: 200px;
  overflow: hidden;
  position: relative;
  border-radius: 100%;
  transition: filter 0.5s ease;
  background-image: url(${props => `${props.url}`});
  background-size: auto 100%;
  background-position: 50% 50%;
  &:hover {
    filter: brightness(0.5);
  }
`;

const EditContainer = styled.button`
  font-size: 15px;
  color: skyblue;
  opacity: 0.5;
  transition: opacity 0.5s ease;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
  border: none;
  background-color: transparent;
`;

const EditIcon = styled.i`
  font-size: 15px;
  margin: 0 5px;
`;

const EditInput = styled.input`
  width: 80%;
  padding: 0 10px;
  height: 30px;
  border: 1px solid #ced4da;
  border-radius: 5px;
  &:focus {
    outline: none;
  }
`;

class Profile extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      editProfilePhoto: false,
      profilePhoto: "",
      editEmail: false,
      email: "",
      editPassword: false,
      password: "",
      editNickName: false,
      nickName: ""
    };
  }

  public componentWillReceiveProps = (props: any) => {
    console.log(props);
  };

  public confirm = (data: any) => {
    const { UpdateMyProfile } = data;
    if (UpdateMyProfile.ok) {
      toast.success("Profile Update Success");
      this.setState({
        editProfilePhoto: false,
        editEmail: false,
        editFullName: false,
        editNickName: false
      });
    } else {
      toast.error(UpdateMyProfile.error);
    }
  };

  public render() {
    return (
      <React.Fragment>
        <Query
          query={PROFILE}
          onCompleted={data => {
            const { user }: any = data.GetMyProfile;
            this.setState({
              email: user.email,
              password: user.password,
              fullName: user.fullName,
              nickName: user.nickName
            });
          }}
        >
          {({ loading, error, data }) => {
            if (loading) {
              return <div>Loading...</div>;
            }
            if (error) {
              return <div>{error.message}</div>;
            }
            console.log(data);
            const user = data.GetMyProfile.user;
            return (
              <ProfileContainer>
                <ProfileInnerContainer>
                  <ProfileTitle>계정</ProfileTitle>
                  <ProfileInfoContainer>
                    <Mutation
                      mutation={EDIT_PROFILE}
                      onCompleted={data => this.confirm(data)}
                    >
                      {UpdateMyProfile => (
                        <React.Fragment>
                          {this.state.editProfilePhoto ? (
                            <Upload
                              type={"PROFILE"}
                              exShownImg={{ url: user.profilePhoto }}
                              UpdateMyProfile={UpdateMyProfile}
                            />
                          ) : (
                            <ProfileImgContainer
                              onClick={() =>
                                this.setState({ editProfilePhoto: true })
                              }
                            >
                              <ProfilePhotoHoverContainer>
                                <EditIcon
                                  style={{ fontSize: "30px" }}
                                  className="fas fa-edit"
                                />
                              </ProfilePhotoHoverContainer>
                              <ProfileImg url={user.profilePhoto} />
                            </ProfileImgContainer>
                          )}

                          <ProfileTextInfoContainer>
                            <ProfileSubTitle>
                              <span>이메일</span>
                              {this.state.editEmail ? (
                                <ProfileSubTitleData style={{ color: "black" }}>
                                  <EditInput
                                    type="text"
                                    value={this.state.email}
                                    onChange={e => {
                                      this.setState({ email: e.target.value });
                                    }}
                                  />
                                  <EditContainer
                                    onClick={() => {
                                      console.log(this.state.email);
                                      UpdateMyProfile({
                                        refetchQueries: [
                                          {
                                            query: PROFILE
                                          }
                                        ],
                                        variables: { email: this.state.email }
                                      });
                                    }}
                                  >
                                    <span>확인</span>
                                  </EditContainer>
                                </ProfileSubTitleData>
                              ) : (
                                <ProfileSubTitleData>
                                  <span>{user.email}</span>
                                  <EditContainer
                                    onClick={() =>
                                      this.setState({ editEmail: true })
                                    }
                                  >
                                    <span>이메일 변경</span>
                                  </EditContainer>
                                </ProfileSubTitleData>
                              )}
                            </ProfileSubTitle>
                            <ProfileSubTitle>
                              <span>비밀번호</span>
                              {this.state.editPassword ? (
                                <ProfileSubTitleData style={{ color: "black" }}>
                                  <EditInput
                                    type="text"
                                    value={this.state.password}
                                    onChange={e => {
                                      this.setState({ email: e.target.value });
                                    }}
                                  />
                                  <EditContainer
                                    onClick={() => {
                                      console.log(this.state.password);
                                      UpdateMyProfile({
                                        refetchQueries: [
                                          {
                                            query: PROFILE
                                          }
                                        ],
                                        variables: {
                                          password: this.state.password
                                        }
                                      });
                                    }}
                                  >
                                    <span>확인</span>
                                  </EditContainer>
                                </ProfileSubTitleData>
                              ) : (
                                <ProfileSubTitleData>
                                  {/* {user.password} */}
                                  <span>*******</span>
                                  <EditContainer
                                    onClick={() =>
                                      this.setState({ editPassword: true })
                                    }
                                  >
                                    비밀번호 변경
                                  </EditContainer>
                                </ProfileSubTitleData>
                              )}
                            </ProfileSubTitle>
                            <ProfileSubTitle>
                              <span>이름</span>
                              {this.state.editFullName ? (
                                <ProfileSubTitleData style={{ color: "black" }}>
                                  <EditInput
                                    type="text"
                                    value={this.state.fullName}
                                    onChange={e => {
                                      this.setState({
                                        fullName: e.target.value
                                      });
                                    }}
                                  />
                                  <EditContainer
                                    onClick={() => {
                                      console.log(this.state.fullName);
                                      UpdateMyProfile({
                                        refetchQueries: [
                                          {
                                            query: PROFILE
                                          }
                                        ],
                                        variables: {
                                          fullName: this.state.fullName
                                        }
                                      });
                                    }}
                                  >
                                    <span>확인</span>
                                  </EditContainer>
                                </ProfileSubTitleData>
                              ) : (
                                <ProfileSubTitleData>
                                  <span>{user.fullName}</span>
                                  <EditContainer
                                    onClick={() =>
                                      this.setState({ editFullName: true })
                                    }
                                  >
                                    이름 변경
                                  </EditContainer>
                                </ProfileSubTitleData>
                              )}
                            </ProfileSubTitle>
                            <ProfileSubTitle>
                              <span>닉네임</span>
                              {this.state.editNickName ? (
                                <ProfileSubTitleData style={{ color: "black" }}>
                                  <EditInput
                                    type="text"
                                    value={this.state.nickName}
                                    onChange={e => {
                                      this.setState({
                                        nickName: e.target.value
                                      });
                                    }}
                                  />
                                  <EditContainer
                                    onClick={() => {
                                      UpdateMyProfile({
                                        refetchQueries: [
                                          {
                                            query: PROFILE
                                          }
                                        ],
                                        variables: {
                                          nickName: this.state.nickName
                                        }
                                      });
                                    }}
                                  >
                                    <span>확인</span>
                                  </EditContainer>
                                </ProfileSubTitleData>
                              ) : (
                                <ProfileSubTitleData>
                                  <span>{user.nickName}</span>
                                  <EditContainer
                                    onClick={() =>
                                      this.setState({ editNickName: true })
                                    }
                                  >
                                    닉네임 변경
                                  </EditContainer>
                                </ProfileSubTitleData>
                              )}
                            </ProfileSubTitle>
                            <ProfileSubTitle>
                              <span>팔로잉</span>
                              <ProfileSubTitleData>
                                <span>{user.following}</span>
                              </ProfileSubTitleData>
                            </ProfileSubTitle>
                            <ProfileSubTitle>
                              <span>팔로워</span>
                              <ProfileSubTitleData>
                                <span>{user.follower}</span>
                              </ProfileSubTitleData>
                            </ProfileSubTitle>
                          </ProfileTextInfoContainer>
                        </React.Fragment>
                      )}
                    </Mutation>
                  </ProfileInfoContainer>
                </ProfileInnerContainer>
              </ProfileContainer>
            );
          }}
        </Query>
      </React.Fragment>
    );
  }
}
export default Profile;
