# Converting meshes

In order to convert .stl or .dae files to ogre meshes you gone need the following two things:
* Blender (https://www.blender.org/)
* Ogre Exporter (https://bitbucket.org/iboshkov/blender2ogre)

After installing these as specified on their website do the following:

* Import the .stl or .dae file
* Switch to edit mode
* Apply UV unwrap (mesh->uv unwrap->smart uv project)
* Switch back to object mode
* Open export menu (file-> export-> ogre3D)
* Set up axes to fit Maxwhere (swap axis xyz)
* Export the mesh