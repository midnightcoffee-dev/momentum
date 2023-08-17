export enum ContentType {
  VIDEO = "VIDEO",
  MARKDOWN = "MARKDOWN",
  QUIZ = "QUIZ",
  AUDIO = "AUDIO",
  SLIDES = "SLIDES",
  IMAGE = "IMAGE",
  INTERACTIVE = "INTERACTIVE",
  EXTERNAL_LINK = "EXTERNAL_LINK",
  DOWNLOADABLE_RESOURCE = "DOWNLOADABLE_RESOURCE",
}

export interface VideoContent {
  title: string;
  description: string;
  url: string;
}
