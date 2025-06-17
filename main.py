import decky
import subprocess
import asyncio
import os

class Plugin:
    # Method to launch Kodi
    async def launch_kodi(self) -> dict:
        try:
            decky.logger.info("Running switch-to-kodi-root directly")
            process = await asyncio.create_subprocess_exec(
                '/usr/bin/switch-to-kodi-root',
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE
            )

            stdout, stderr = await process.communicate()

            if process.returncode == 0:
                decky.logger.info("Successfully launched Kodi")
                return {"success": True, "message": "Kodi launched successfully"}
            else:
                error_msg = stderr.decode() if stderr else "Unknown error"
                decky.logger.error(f"Failed to launch Kodi: {error_msg}")
                return {"success": False, "message": f"Failed to launch Kodi: {error_msg}"}

        except Exception as e:
            decky.logger.error(f"Exception launching Kodi: {str(e)}")
            return {"success": False, "message": f"Error: {str(e)}"}


    # Asyncio-compatible long-running code, executed in a task when the plugin is loaded
    async def _main(self):
        decky.logger.info("Kodi Launcher plugin loaded")
        # Check if we're running as root
        if os.geteuid() == 0:
            decky.logger.info("Running with root privileges")
        else:
            decky.logger.warning("Not running as root - some operations may fail")

    # Function called first during the unload process
    async def _unload(self):
        decky.logger.info("Kodi Launcher plugin unloaded")
