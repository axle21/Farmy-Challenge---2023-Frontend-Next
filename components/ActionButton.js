import styles from "@/styles/ActionBtn.module.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import Image from "next/image";

const ActionButton = ({ onClick, iconSrc, alt, tooltipContent, tooltipId }) => (
  <>
    <button
      onClick={onClick}
      className={styles.edit_btn}
      data-tooltip-id={tooltipId}
    >
      <Image src={iconSrc} width={24} height={24} alt={alt} />
    </button>
    <ReactTooltip
      id={tooltipId}
      variant="dark"
      content={tooltipContent}
      delayShow={300}
    />
  </>
);

export default ActionButton;
