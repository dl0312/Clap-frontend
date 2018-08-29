import * as React from "react";
import Dropzone from "react-dropzone";
import { Mutation, FetchResult } from "react-apollo";
import { UPLOAD_SHOWNIMAGE } from "./UploadQueries";
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
  type: "POST_IMAGE" | "WIKIIMAGE_ADD" | "WIKIIMAGE_EDIT";
  exShownImg: { url: string };
  handleOnChange?: any;
  masterCallback?: any;
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

  public render() {
    // const { history } = this.props;
    return (
      <div>
        <FlexBox>
          <UploadQuery
            mutation={UPLOAD_SHOWNIMAGE}
            onCompleted={data => {
              const { UploadShownImage } = data;
              if (UploadShownImage.ok) {
                toast.success("Place added!");
                // setTimeout(() => {
                //   history.push("/places");
                // }, 2000);
              } else {
                toast.error(UploadShownImage.error);
              }
              // history.push(`/guide`);
            }}
          >
            {(UploadShownImage, { data, loading }) => (
              <Dropzone
                accept="image/*"
                multiple={false}
                onDrop={async ([file]) => {
                  console.log(file);
                  this.setState({ file });
                  const response = (await UploadShownImage({
                    variables: { file }
                  })) as FetchResult<uploadShownImage, Record<string, any>>;
                  if (this.props.type === "POST_IMAGE") {
                    this.props.handleOnChange(
                      `http://localhost:4000/uploads/${
                        response!.data!.UploadShownImage!.shownImage!.url
                      }`,
                      this.props.selectedIndex,
                      "IMAGE",
                      "URL"
                    );
                  } else {
                    this.props.masterCallback(
                      "shownImage",
                      response!.data!.UploadShownImage.shownImage
                    );
                  }
                }}
              >
                {this.props.type === "POST_IMAGE" ? (
                  this.props.exShownImg ? (
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
