export type DefinitionMarkerTone = "label" | "value";

export type DefinitionProps = {
  label: string | number;
  value: string | number;
  markerTone?: DefinitionMarkerTone;
  className?: string;
};
