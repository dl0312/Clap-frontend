import axios from "axios";
import * as React from "react";
import Dropzone from "react-dropzone";
import { Mutation } from "react-apollo";
import { PROFILE, UPLOAD_SHOWNIMAGE } from "../../sharedQueries";
import { uploadShownImage, uploadShownImageVariables } from "../../types/api";
import styled from "styled-components";
import { toast } from "react-toastify";

const FlexBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
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

const DropInnerText = FlexBox.extend`
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
  type: "POST_IMAGE" | "WIKIIMAGE_ADD" | "WIKIIMAGE_EDIT" | "PROFILE";
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
  width: "100px",
  height: "100px",
  outline: "1px dashed black"
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
    return (
      <div>
        <FlexBox>
          <UploadQuery
            mutation={UPLOAD_SHOWNIMAGE}
            onCompleted={data => this.confirm(data)}
          >
            {uploadShownImage => (
              <Dropzone
                style={dropzoneStyle}
                accept="image/*"
                multiple={false}
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
                    } else {
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
                ) : this.props.type === "WIKIIMAGE_ADD" ||
                this.props.type === "WIKIIMAGE_EDIT" ? (
                  this.props.exShownImg !== undefined ? (
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
        </FlexBox>
      </div>
    );
  }

  public onInputChange: React.ChangeEventHandler<
    HTMLInputElement
  > = async event => {
    const {
      target: { name, value, files }
    } = event;
    if (files) {
      this.setState({
        uploading: true
      });
      const formData = new FormData();
      formData.append("file", files[0]);
      formData.append("api_key", "641929979264519");
      formData.append("upload_preset", "clap_image_manager");
      formData.append("timestamp", String(Date.now() / 1000));
      const {
        data: { secure_url }
      } = await axios.post(
        "https://api.cloudinary.com/v1_1/clap_image_manager/image/upload",
        formData
      );
      if (secure_url) {
        this.setState({
          uploading: false
        });
      }
    }
    this.setState({
      [name]: value
    } as any);
  };
}

export default Upload;
