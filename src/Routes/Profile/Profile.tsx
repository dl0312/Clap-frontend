import React from "react";
import styled from "styled-components";
import { Query, Mutation } from "react-apollo";
import { PROFILE, EDIT_PROFILE } from "../../sharedQueries";
import { sizes } from "../../config/_mixin";
import { toast } from "react-toastify";
import axios from "axios";

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
  border-bottom: 0.5px solid black;
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
  font-weight: bolder;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const EditIcon = styled.i`
  margin: 0 5px;
  font-size: 30px;
  position: absolute;
  color: white;
  top: 41%;
  left: 40%;
  opacity: 0;
  transition: opacity 0.2s ease;
  cursor: pointer;
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
`;

const ProfilePhotoHoverContainer = styled.label`
  font-size: 20px;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  transition: opacity 0.5s ease;
  position: relative;
  &:hover {
    ${ProfileImg} {
      filter: brightness(0.5);
    }
    ${EditIcon} {
      opacity: 1;
    }
  }
`;

const ProfileImgInput = styled.input`
  color: white;
  opacity: 0;
  width: 0px;
  height: 0px;
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
      <Query
        query={PROFILE}
        fetchPolicy={"cache-and-network"}
        onCompleted={data => {
          if ("GetMyProfile" in data) {
            const {
              GetMyProfile: { user }
            } = data;
            if (user !== null) {
              const { email, nickName, profilePhoto, password } = user;
              this.setState({
                email,
                nickName,
                profilePhoto,
                password,
                uploaded: profilePhoto !== null
              } as any);
            }
          }
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
                    refetchQueries={[{ query: PROFILE }]}
                    onCompleted={data => this.confirm(data)}
                  >
                    {(UpdateMyProfile, { data }) => (
                      <React.Fragment>
                        <ProfileImgInput
                          id={"photo"}
                          type="file"
                          accept="image/*"
                          onChange={event =>
                            this.onInputImageChange(event, UpdateMyProfile)
                          }
                        />
                        <ProfilePhotoHoverContainer htmlFor="photo">
                          <ProfileImg url={user.profilePhoto} />
                          <EditIcon className="fas fa-edit" />
                        </ProfilePhotoHoverContainer>
                        <ProfileTextInfoContainer>
                          <ProfileSubTitle>
                            <span>이메일</span>
                            {this.state.editEmail ? (
                              <ProfileSubTitleData style={{ color: "black" }}>
                                <EditInput
                                  type="email"
                                  value={this.state.email}
                                  onChange={e => {
                                    this.setState({
                                      email: e.target.value
                                    });
                                  }}
                                  placeholder={"Email"}
                                  name={"email"}
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
                                      variables: {
                                        email: this.state.email
                                      }
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
                                  type="password"
                                  value={this.state.password}
                                  onChange={e => {
                                    this.setState({
                                      email: e.target.value
                                    });
                                  }}
                                  placeholder={"Password"}
                                  name={"password"}
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
                                    this.setState({
                                      editPassword: true
                                    })
                                  }
                                >
                                  비밀번호 변경
                                </EditContainer>
                              </ProfileSubTitleData>
                            )}
                          </ProfileSubTitle>
                          <ProfileSubTitle>
                            <span>이름</span>
                            <ProfileSubTitleData>
                              <span>{user.fullName}</span>
                            </ProfileSubTitleData>
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
                                  placeholder={"Nick Name"}
                                  name={"nickName"}
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
                                    this.setState({
                                      editNickName: true
                                    })
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
                              {user.following.map((user: any, index: any) => {
                                return <div key={index}>{user.nickName}</div>;
                              })}
                            </ProfileSubTitleData>
                          </ProfileSubTitle>
                          <ProfileSubTitle>
                            <span>팔로워</span>
                            <ProfileSubTitleData>
                              {user.followers.map((user: any, index: any) => {
                                return <div key={index}>{user.nickName}</div>;
                              })}
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
    );
  }
  public onInputImageChange = async (event: any, UpdateMyProfile: any) => {
    const {
      target: { name, value, files }
    } = event;
    if (files) {
      this.setState({
        Uploading: true
      });
      const formData = new FormData();
      formData.append("file", files[0]);
      formData.append("api_key", "811881451928618");
      formData.append("upload_preset", "tqecb16q");
      formData.append("timestamp", String(Date.now() / 1000));
      const {
        data: { secure_url }
      } = await axios.post(
        "https://api.cloudinary.com/v1_1/djjpx4ror/image/upload",
        formData
      );
      if (secure_url) {
        UpdateMyProfile({
          refetchQueries: [
            {
              query: PROFILE
            }
          ],
          variables: {
            profilePhoto: secure_url
          }
        });
        this.setState({
          Uploading: false
        });
      }
    }
    this.setState({
      [name]: value
    } as any);
  };
}
export default Profile;
