import subprocess
import os

def change_file_extension(file_path, new_extension):
    directory, filename_with_extension = os.path.split(file_path)
    filename, _ = os.path.splitext(filename_with_extension)

    new_file_path = os.path.join(directory, f"{filename}.{new_extension}")

    return new_file_path

def convert_webm_to_mp3(input_file, output_file):
    ffmeg_path = r'C:\Users\Jason\Polish-Passion-Project\ffmpeg-2023-12-14-git-5256b2fbe6-essentials_build\bin\ffmpeg.exe'
    command = [
        ffmeg_path,
        '-i', input_file,
        '-vn',
        '-ar', '44100',
        '-ac', '2',
        '-ab', '192k',
        '-f', 'mp3',
        output_file
    ]

    try:
        # Run the command
        subprocess.run(command, check=True)
        print(f"Conversion successful: {input_file} -> {output_file}")
    except subprocess.CalledProcessError as e:
        print(f"Error during conversion: {e}")

def duration_command(file_path):
    ffprobe_path = r'C:\Users\Jason\Polish-Passion-Project\ffmpeg-2023-12-14-git-5256b2fbe6-essentials_build\bin\ffprobe.exe'
    # Command to get audio duration using ffprobe
    command = [
        ffprobe_path,
        '-v', 'error',
        '-show_entries', 'format=duration',
        '-of', 'default=noprint_wrappers=1:nokey=1',
        file_path
    ]

    try:
        # Run the command and capture the output
        result = subprocess.check_output(command, text=True)
        duration = float(result.strip())
        print(f"Duration of {file_path}: {duration} seconds")
        return duration
    except subprocess.CalledProcessError as e:
        print(f"Error during ffprobe: {e}")
        return None