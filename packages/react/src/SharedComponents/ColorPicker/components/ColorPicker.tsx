import { Menu } from "@mantine/core";
import { ColorIcon } from "./ColorIcon";
import { TiTick } from "react-icons/ti";
import {useMemo} from "react";

export const defaultColorSections = [
  "default",
  "gray",
  "brown",
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "purple",
  "pink",
  ];

export const ColorPicker = (props: {
  onClick?: () => void;
  iconSize?: number;
  text?: {
    color: string;
    setColor: (color: string) => void;
  };
  background?: {
    color: string;
    setColor: (color: string) => void;
  };
  colorSections?: string[];
  colorLabels?: Record<string, string>;
}) => {
  const colors = useMemo(() => {
    if (props.colorSections) {
      return props.colorSections;
    }

    return defaultColorSections;
  }, [props]);

  const labels = useMemo(() => {
    const newLabels: Record<string, string> = {};
    colors.forEach((color) => {
      if (props.colorLabels && Object.hasOwn(props.colorLabels, color)) {
        newLabels[color] = props.colorLabels[color];
      } else {
        newLabels[color] = color.charAt(0).toUpperCase() + color.slice(1);
      }
    });

    return newLabels;
  }, [props.colorLabels, colors]);

  const TextColorSection = () =>
    props.text ? (
      <>
        <Menu.Label>Text</Menu.Label>
        {colors.map((color) => (
          <Menu.Item
            onClick={() => {
              props.onClick && props.onClick();
              props.text!.setColor(color);
            }}
            component={"div"}
            data-test={"text-color-" + color}
            icon={<ColorIcon textColor={color} size={props.iconSize} />}
            key={"text-color-" + color}
            rightSection={
              props.text!.color === color ? (
                <TiTick size={16} style={{ paddingLeft: "8px" }} />
              ) : (
                <div style={{ width: "24px", padding: "0" }} />
              )
            }>
            {labels[color]}
          </Menu.Item>
        ))}
      </>
    ) : null;

  const BackgroundColorSection = () =>
    props.background ? (
      <>
        <Menu.Label>Background</Menu.Label>
        {colors.map((color) => (
          <Menu.Item
            onClick={() => {
              props.onClick && props.onClick();
              props.background!.setColor(color);
            }}
            component={"div"}
            data-test={"background-color-" + color}
            icon={<ColorIcon backgroundColor={color} size={props.iconSize} />}
            key={"background-color-" + color}
            rightSection={
              props.background!.color === color ? (
                <TiTick size={16} style={{ paddingLeft: "8px" }} />
              ) : (
                <div style={{ width: "24px", padding: "0" }} />
              )
            }>
            {labels[color]}
          </Menu.Item>
        ))}
      </>
    ) : null;

  return (
    <>
      <TextColorSection />
      <BackgroundColorSection />
    </>
  );
};
