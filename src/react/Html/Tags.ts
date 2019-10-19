import { NinComponentInfo, NinComponentString } from "../Entities/NinElement";
import { AttributeInfo, AttributeTypes } from "./Attribute";

const list: Array<{
  name: string;
  hasChild: boolean;
  attributes?: AttributeInfo[];
}> = [
  { name: "section", hasChild: true },
  { name: "nav", hasChild: true },
  { name: "article", hasChild: true },
  { name: "aside", hasChild: true },
  { name: "h1", hasChild: true },
  { name: "h2", hasChild: true },
  { name: "h3", hasChild: true },
  { name: "h4", hasChild: true },
  { name: "h5", hasChild: true },
  { name: "h6", hasChild: true },
  { name: "header", hasChild: true },
  { name: "footer", hasChild: true },
  { name: "address", hasChild: true },
  { name: "p", hasChild: true },
  { name: "hr", hasChild: true },
  { name: "pre", hasChild: true },
  { name: "blockquote", hasChild: true },
  { name: "ol", hasChild: true },
  { name: "ul", hasChild: true },
  { name: "li", hasChild: true },
  { name: "dl", hasChild: true },
  { name: "dt", hasChild: true },
  { name: "dd", hasChild: true },
  { name: "figure", hasChild: true },
  { name: "figcaption", hasChild: true },
  { name: "div", hasChild: true },
  { name: "main", hasChild: true },
  { name: "a", hasChild: true },
  { name: "em", hasChild: true },
  { name: "strong", hasChild: true },
  { name: "small", hasChild: true },
  { name: "s", hasChild: true },
  { name: "cite", hasChild: true },
  { name: "q", hasChild: true },
  { name: "dfn", hasChild: true },
  { name: "abbr", hasChild: true },
  { name: "time", hasChild: true },
  { name: "code", hasChild: true },
  { name: "var", hasChild: true },
  { name: "samp", hasChild: true },
  { name: "kbd", hasChild: true },
  { name: "sub", hasChild: true },
  { name: "sup", hasChild: true },
  { name: "i", hasChild: true },
  { name: "b", hasChild: true },
  { name: "mark", hasChild: true },
  { name: "ruby", hasChild: true },
  { name: "rt", hasChild: true },
  { name: "rp", hasChild: true },
  { name: "bdo", hasChild: true },
  { name: "span", hasChild: true },
  { name: "br", hasChild: false },
  { name: "wbr", hasChild: false },
  { name: "ins", hasChild: true },
  { name: "del", hasChild: true },
  { name: "img", hasChild: false },
  { name: "iframe", hasChild: true },
  { name: "embed", hasChild: false },
  { name: "object", hasChild: true },
  { name: "param", hasChild: false },
  { name: "video", hasChild: true },
  { name: "audio", hasChild: true },
  { name: "source", hasChild: false },
  { name: "canvas", hasChild: true },
  { name: "map", hasChild: true },
  { name: "area", hasChild: false },
  { name: "table", hasChild: true },
  { name: "caption", hasChild: true },
  { name: "colgroup", hasChild: true },
  { name: "col", hasChild: false },
  { name: "tbody", hasChild: true },
  { name: "thead", hasChild: true },
  { name: "tfoot", hasChild: true },
  { name: "tr", hasChild: true },
  { name: "td", hasChild: true },
  { name: "th", hasChild: true },
  { name: "form", hasChild: true },
  { name: "fieldset", hasChild: true },
  { name: "legend", hasChild: true },
  { name: "label", hasChild: true },
  {
    name: "input",
    hasChild: false,
    attributes: [
      {
        name: "type",
        isRequired: true,
        type: AttributeTypes.SELECT,
        select: [
          "text",
          "password",
          "checkbox",
          "radio",
          "url",
          "date",
          "datetime-local",
          "month",
          "time",
          "week",
          "email",
          "tel",
          "color",
          "number",
          "range",
          "search",
          "file",
          "hidden",
          "submit",
          "reset",
          "button",
          "image"
        ]
      },
      { name: "accept", isRequired: false, type: AttributeTypes.string }, // todo audio/* video/* image/*
      {
        name: "autocomplete",
        isRequired: false,
        type: AttributeTypes.SELECT,
        select: [
          "off",
          "on",
          "name",
          "honorific-prefix",
          "given-name",
          "additional-name",
          "family-name",
          "honorific-suffix",
          "nickname",
          "email",
          "username",
          "new-password",
          "current-password",
          "organization-title",
          "organization",
          "street-address",
          "address-line1",
          "address-line2",
          "address-line3",
          "address-level4",
          "address-level3",
          "address-level2",
          "address-level1",
          "country",
          "country-name",
          "postal-code",
          "cc-name",
          "cc-given-name",
          "cc-additional-name",
          "cc-family-name",
          "cc-number",
          "cc-exp",
          "cc-exp-month",
          "cc-exp-year",
          "cc-csc",
          "cc-type",
          "transaction-currency",
          "transaction-amount",
          "language",
          "bday",
          "bday-day",
          "bday-month",
          "bday-year",
          "sex",
          "tel",
          "tel-country-code",
          "tel-national",
          "tel-area-code",
          "tel-local",
          "tel-local-prefix",
          "tel-local-suffix",
          "tel-extension",
          "url",
          "photo"
        ]
      },
      { name: "autofocus", isRequired: false, type: AttributeTypes.boolean },
      { name: "capture", isRequired: false, type: AttributeTypes.boolean },
      { name: "checked", isRequired: false, type: AttributeTypes.boolean },
      { name: "disabled", isRequired: false, type: AttributeTypes.boolean },
      { name: "form", isRequired: false, type: AttributeTypes.HTMLid },
      { name: "formaction", isRequired: false, type: AttributeTypes.URI },
      { name: "formenctype", isRequired: false, type: AttributeTypes.string }, // todo
      {
        name: "formmethod",
        isRequired: false,
        type: AttributeTypes.SELECT,
        select: ["post", "get"]
      },
      {
        name: "formnovalidate",
        isRequired: false,
        type: AttributeTypes.boolean
      },
      { name: "formtarget", isRequired: false, type: AttributeTypes.string },
      { name: "height", isRequired: false, type: AttributeTypes.CSSLength },
      {
        name: "inputmode",
        isRequired: false,
        type: AttributeTypes.SELECT,
        select: [
          "none",
          "text",
          "decimal",
          "numeric",
          "tel",
          "search",
          "email",
          "url"
        ]
      },
      { name: "list", isRequired: false, type: AttributeTypes.HTMLid },
      { name: "max", isRequired: false, type: AttributeTypes.any }, // todo
      { name: "min", isRequired: false, type: AttributeTypes.any }, // todo
      { name: "maxlength", isRequired: false, type: AttributeTypes.int },
      { name: "minlength", isRequired: false, type: AttributeTypes.int },
      { name: "multiple", isRequired: false, type: AttributeTypes.boolean },
      { name: "name", isRequired: false, type: AttributeTypes.string },
      { name: "pattern", isRequired: false, type: AttributeTypes.string },
      { name: "placeholder", isRequired: false, type: AttributeTypes.string },
      { name: "readonly", isRequired: false, type: AttributeTypes.boolean },
      {
        name: "selectionDirection",
        isRequired: false,
        type: AttributeTypes.SELECT,
        select: ["none", "forward", "backward"]
      },
      { name: "size", isRequired: false, type: AttributeTypes.int },
      {
        name: "spellcheck ",
        isRequired: false,
        type: AttributeTypes.SELECT,
        select: ["default", "true", "false"]
      },
      { name: "src", isRequired: false, type: AttributeTypes.imageURI },
      { name: "step", isRequired: false, type: AttributeTypes.any }, // todo
      { name: "tabindex", isRequired: false, type: AttributeTypes.int },
      { name: "width", isRequired: false, type: AttributeTypes.CSSLength }
    ]
  },
  { name: "button", hasChild: true },
  { name: "select", hasChild: true },
  { name: "datalist", hasChild: true },
  { name: "optgroup", hasChild: true },
  { name: "option", hasChild: false },
  { name: "textarea", hasChild: true },
  { name: "keygen", hasChild: false },
  { name: "output", hasChild: true },
  { name: "progress", hasChild: true },
  { name: "meter", hasChild: false },
  { name: "details", hasChild: true },
  { name: "summary", hasChild: true },
  { name: "menu", hasChild: true }
];

export const HTML_PATH = "HTML";

const getHTMLTagData = (): NinComponentInfo[] => {
  return list
    .map(it => ({
      path: HTML_PATH,
      type: it.name,
      hasChild: it.hasChild,
      attributes: it.attributes || [],
      hasCss: true,
      row: `<${it.name}${NinComponentString.Attributes}>${
        it.hasChild ? NinComponentString.Children : ""
      }</${it.name}>`
    }))
    .concat({
      path: HTML_PATH,
      type: "textNode",
      hasChild: false,
      hasCss: false,
      row: NinComponentString.Text,
      attributes: [
        { name: "text", isRequired: false, type: AttributeTypes.HTMLString }
      ]
    });
};

export const HTML_TAGS = getHTMLTagData();
Object.freeze(HTML_TAGS);
