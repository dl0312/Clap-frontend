import axios from "axios";
import * as React from "react";
import Dropzone from "react-dropzone";
import { Mutation } from "react-apollo";
import { PROFILE, UPLOAD_SHOWNIMAGE } from "../../sharedQueries";
import { uploadShownImage, uploadShownImageVariables } from "../../types/api";
import styled from "styled-components";
import { toast } from "react-toastify";

interface IUploadContainerProps {
  type: "POST_IMAGE" | "WIKIIMAGE" | "PROFILE";
}

const UploadContainer = styled<IUploadContainerProps, any>("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: ${props => {
    switch (props.type) {
      case "POST_IMAGE":
        return "100px";
      case "WIKIIMAGE":
        return "200px";
      case "PROFILE":
        return "100px";
      default:
        return;
    }
  }};
  height: ${props => {
    switch (props.type) {
      case "POST_IMAGE":
        return "100px";
      case "WIKIIMAGE":
        return "200px";
      case "PROFILE":
        return "100px";
      default:
        return;
    }
  }};
  outline: ${props => {
    switch (props.type) {
      case "POST_IMAGE":
        return "1px dashed black";
      case "WIKIIMAGE":
        return "1px dashed white";
      case "PROFILE":
        return "1px dashed black";
      default:
        return;
    }
  }};
  background-color: white;
`;

const PreviewImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

// const PreviewContainer = styled.div`
//   margin: 5px 0;
// `;

// const PreviewTitle = styled.div`
//   text-transform: uppercase;
//   font-size: 15px;
//   font-weight: bolder;
//   margin: 3px;
// `;

const DropInnerText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  width: 100%;
  height: 100%;
  text-align: center;
  text-transform: uppercase;
`;

class UploadQuery extends Mutation<
  uploadShownImage,
  uploadShownImageVariables
> {}

interface IProps {
  type: "POST_IMAGE" | "WIKIIMAGE" | "PROFILE";
  exShownImg: { url: string };
  handleOnChange?: any;
  masterCallback?: any;
  UpdateMyProfile?: any;
  selectedIndex?: number | number[];
}

interface IState {
  file: File | null;
  uploading: boolean;
}

const dropzoneStyle = {
  width: "100%",
  height: "100%"
};

class Upload extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { file: null, uploading: false };
  }

  public confirm = (data: any) => {
    const { UploadShownImage } = data;
    if (UploadShownImage.ok) {
      toast.success("Image Uploaded!");
    } else {
      toast.error(UploadShownImage.error);
    }
  };

  public render() {
    const { type } = this.props;
    console.log(this.props);
    return (
      <div>
        <UploadContainer type={type}>
          <UploadQuery
            mutation={UPLOAD_SHOWNIMAGE}
            onCompleted={data => this.confirm(data)}
          >
            {uploadShownImage => (
              <Dropzone
                style={dropzoneStyle}
                accept="image/*"
                multiple={false}
                maxSize={5242880}
                onDrop={async ([file]) => {
                  this.setState({ uploading: true });
                  const formData = new FormData();
                  formData.append("file", file);
                  formData.append("api_key", "641929979264519");
                  formData.append("upload_preset", "clap_image_manager");
                  formData.append("timestamp", String(Date.now() / 1000));
                  const {
                    data: { secure_url, public_id }
                  } = await axios.post(
                    "https://api.cloudinary.com/v1_1/clap_image_manager/image/upload",
                    formData
                  );
                  console.log();
                  if (secure_url) {
                    if (this.props.type === "POST_IMAGE") {
                      this.props.handleOnChange(
                        secure_url,
                        this.props.selectedIndex,
                        "IMAGE",
                        "URL"
                      );
                    } else if (this.props.type === "PROFILE") {
                      this.props.UpdateMyProfile({
                        refetchQueries: [
                          {
                            query: PROFILE
                          }
                        ],
                        variables: {
                          profilePhoto: secure_url
                        }
                      });
                    } else if (this.props.type === "WIKIIMAGE") {
                      this.props.masterCallback(
                        "shownImage",
                        secure_url,
                        public_id
                      );
                    }
                    this.setState({ uploading: false });
                  }
                  this.setState({ file });
                }}
              >
                {this.props.type === "POST_IMAGE" ? (
                  this.props.exShownImg.url !== undefined ? (
                    <PreviewImg src={this.props.exShownImg.url} alt="preview" />
                  ) : (
                    <DropInnerText>
                      Drop Image
                      <br />
                      Click Here
                    </DropInnerText>
                  )
                ) : this.props.type === "PROFILE" ? (
                  this.props.exShownImg.url !== undefined ? (
                    <PreviewImg src={this.props.exShownImg.url} alt="preview" />
                  ) : (
                    <DropInnerText>
                      Drop Image
                      <br />
                      Click Here
                    </DropInnerText>
                  )
                ) : this.props.type === "WIKIIMAGE" ? (
                  this.props.exShownImg.url !== null ? (
                    <PreviewImg src={this.props.exShownImg.url} alt="preview" />
                  ) : (
                    <DropInnerText>
                      Drop Image
                      <br />
                      Click Here
                    </DropInnerText>
                  )
                ) : null}
              </Dropzone>
            )}
          </UploadQuery>
          {/* <PreviewTitle>Dropped file</PreviewTitle>
          {this.state.file ? (
            <PreviewContainer>
              <div>
                {this.state.file.name} - {this.state.file.size} bytes
              </div>
            </PreviewContainer>
          ) : null} */}
        </UploadContainer>
      </div>
    );
  }
}

export default Upload;
