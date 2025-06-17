import {
  ButtonItem,
  PanelSection,
  PanelSectionRow,
  staticClasses
} from "@decky/ui";
import {
  callable,
  definePlugin,
  toaster,
} from "@decky/api"
import { VFC } from "react";
import { FaTv } from "react-icons/fa";

// Define the backend function
const launchKodi = callable<[], { success: boolean; message: string }>("launch_kodi");

const Content: VFC = () => {
  const handleLaunchKodi = async () => {
    try {
      const result = await launchKodi();

      if (result.success) {
        toaster.toast({
          title: "Kodi Launcher",
          body: result.message,
          duration: 3000
        });
      } else {
        toaster.toast({
          title: "Kodi Launcher",
          body: result.message,
          critical: true,
          duration: 5000
        });
      }
    } catch (error) {
      toaster.toast({
        title: "Kodi Launcher",
        body: "Failed to communicate with backend",
        critical: true,
        duration: 5000
      });
    }
  };

  return (
    <PanelSection title="Launch Kodi">
    <PanelSectionRow>
    <ButtonItem
    layout="below"
    onClick={handleLaunchKodi}
    >
    Launch Kodi
    </ButtonItem>
    </PanelSectionRow>
    </PanelSection>
  );
};

export default definePlugin(() => {
  return {
    name: "Kodi Launcher",
    titleView: <div className={staticClasses.Title}>Kodi Launcher</div>,
    content: <Content />,
    icon: <FaTv />,
    onDismount() {
      console.log("Kodi Launcher unloaded");
    },
  };
});
