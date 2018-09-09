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

const PreviewContainer = styled.div`
  margin: 5px 0;
`;

const PreviewTitle = styled.div`
  text-transform: uppercase;
  font-size: 15px;
  font-weight: bolder;
  margin: 3px;
`;

const DropInnerText = FlexBox.extend`
  padding: 10px;
  width: 100%;
  height: 100%;
  text-align: center;
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
}

class Upload extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { file: null };
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
    // const { history } = this.props;
    console.log(this.props);
    return (
      <div>
        <FlexBox>
          <UploadQuery
            mutation={UPLOAD_SHOWNIMAGE}
            onCompleted={data => this.confirm(data)}
          >
            {uploadShownImage => (
              <Dropzone
                accept="image/*"
                multiple={false}
                onDrop={async ([file]) => {
                  this.setState({ file });
                  const response: any = await uploadShownImage({
                    variables: { file }
                  });
                  if (this.props.type === "POST_IMAGE") {
                    this.props.handleOnChange(
                      `http://localhost:4000/uploads/${
                        response!.data!.UploadShownImage!.shownImage!.url
                      }`,
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
                        profilePhoto: `http://localhost:4000/uploads/${
                          response!.data!.UploadShownImage!.shownImage!.url
                        }`
                      }
                    });
                  } else {
                    this.props.masterCallback(
                      "shownImage",
                      response!.data!.UploadShownImage.shownImage
                    );
                  }
                }}
              >
                {this.props.type === "POST_IMAGE" ||
                this.props.type === "PROFILE" ? (
                  this.props.exShownImg.url !== undefined ? (
                    <PreviewImg src={this.props.exShownImg.url} alt="preview" />
                  ) : (
                    <DropInnerText>
                      Try dropping some files here, or click to select files to
                      upload.
                    </DropInnerText>
                  )
                ) : this.props.exShownImg ? (
                  <PreviewImg
                    src={`http://localhost:4000/uploads/${
                      this.props.exShownImg.url
                    }`}
                    alt="preview"
                  />
                ) : (
                  <DropInnerText>
                    Try dropping some files here, or click to select files to
                    upload.
                  </DropInnerText>
                )}
              </Dropzone>
            )}
          </UploadQuery>
          <PreviewTitle>Dropped file</PreviewTitle>
          {this.state.file ? (
            <PreviewContainer>
              <div>
                {this.state.file.name} - {this.state.file.size} bytes
              </div>
            </PreviewContainer>
          ) : null}
        </FlexBox>
      </div>
    );
  }
}

export default Upload;
