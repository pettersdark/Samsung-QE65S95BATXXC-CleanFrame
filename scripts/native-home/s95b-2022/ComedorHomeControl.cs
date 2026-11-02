using System;
using System.Collections.Generic;
using System.IO;
using System.Runtime.InteropServices;
using System.Text.Json;
class ComedorHomeControl {
 const string Operation="http://tizen.org/appcontrol/operation/main";
 const string Target="YourDining.CleanFrame";
 static readonly string[] Keys={"db/appfw/home_appid","db/appfw/startup_appid","db/appfw/booting_appid_backup","db/first_screen/type"};
 const string AutoKey="db/menu/smart_hub/ontvsetting/auto_start";
 [DllImport("libbundle.so.0")] static extern IntPtr bundle_create();
 [DllImport("libbundle.so.0")] static extern void bundle_free(IntPtr b);
 [DllImport("libaul.so.0")] static extern int aul_svc_set_operation(IntPtr b,string op);
 [DllImport("libaul.so.0")] static extern int aul_get_default_app(IntPtr b,out IntPtr app);
 [DllImport("libapp-context-manager-common.so")] static extern byte util_is_appbooting_supported_webapp_byappid(string app);
 [DllImport("libcapi-appfw-app-operation-tv.so.0")] static extern int app_operation_set_current_app(string op,string app);
 [DllImport("libvconf.so.0")] static extern IntPtr vconf_get_str(string key);
 [DllImport("libvconf.so.0")] static extern int vconf_get_int(string key,out int value);
 [DllImport("libc")] static extern uint getuid();
 [DllImport("libc")] static extern void free(IntPtr ptr);
 public class Snapshot {public string Home{get;set;} public Dictionary<string,string> Strings{get;set;} public int Autostart{get;set;} public uint Uid{get;set;} public int BootSupported{get;set;} public int LastApp{get;set;} public string LastService{get;set;}}
 static string ReadString(string key){IntPtr p=vconf_get_str(key);if(p==IntPtr.Zero)throw new Exception("Cannot read "+key);try{return Marshal.PtrToStringAnsi(p);}finally{free(p);}}
 static string Home(){IntPtr b=bundle_create();if(b==IntPtr.Zero)throw new Exception("No bundle");try{if(aul_svc_set_operation(b,Operation)!=0)throw new Exception("Cannot set query operation");IntPtr p;if(aul_get_default_app(b,out p)!=0||p==IntPtr.Zero)throw new Exception("Cannot read Home operation");try{return Marshal.PtrToStringAnsi(p);}finally{free(p);}}finally{bundle_free(b);}}
 static Snapshot Query(){var s=new Snapshot{Home=Home(),Strings=new Dictionary<string,string>(),Uid=getuid(),BootSupported=util_is_appbooting_supported_webapp_byappid(Target)};foreach(var k in Keys)s.Strings[k]=ReadString(k);int v;if(vconf_get_int(AutoKey,out v)!=0)throw new Exception("Cannot read autostart");s.Autostart=v;if(vconf_get_int("db/menu/app_booting",out v)!=0)throw new Exception("Cannot read last-app setting");s.LastApp=v;s.LastService=ReadString("db/boot/last_service");return s;}
 static void SetHome(string value){if(app_operation_set_current_app(Operation,value)!=0||Home()!=value)throw new Exception("Home operation write/readback failed");}
 static void Restore(Snapshot s){SetHome(s.Home);}
 static void CheckSnapshot(Snapshot s){if(s==null||string.IsNullOrWhiteSpace(s.Home)||s.Strings==null||s.Strings.Count!=Keys.Length||(s.Autostart!=0&&s.Autostart!=1))throw new Exception("Invalid original snapshot");foreach(var k in Keys)if(!s.Strings.ContainsKey(k)||string.IsNullOrWhiteSpace(s.Strings[k]))throw new Exception("Missing original setting: "+k);}

 static void SamePreferences(Snapshot a,Snapshot b){if(a.LastApp!=b.LastApp||a.LastService!=b.LastService)throw new Exception("Resume/source setting changed; stop");if(a.Autostart!=b.Autostart)throw new Exception("Autostart changed; stop");foreach(var k in Keys)if(a.Strings[k]!=b.Strings[k])throw new Exception("Preference changed: "+k);}
 static int Main(string[] args){try{
  if(IntPtr.Size!=4||getuid()!=901)throw new Exception("Expected 32-bit SDK user, no root");
  if(!File.ReadAllText("/etc/prd_info.ini").Contains("Version=T-PTMDEUC-1720.7;"))throw new Exception("Unexpected firmware");
  if(args.Length==1&&args[0]=="query"){Console.WriteLine("CLEANFRAME_HOME_JSON="+JsonSerializer.Serialize(Query()));return 0;}
  if(args.Length!=2)throw new Exception("Expected action and baseline");
  var original=JsonSerializer.Deserialize<Snapshot>(File.ReadAllText(args[1]));CheckSnapshot(original);var before=Query();
  if(args[0]!="restore") SamePreferences(original,before);
  if(args[0]=="verify-baseline"){if(before.Home!=original.Home)throw new Exception("Home changed");Console.WriteLine("COMEDOR_BASELINE_VERIFIED");return 0;}
  if(args[0]=="restore"){if(before.Home!=Target&&before.Home!=original.Home)throw new Exception("Unexpected Home target");Restore(original);SamePreferences(before,Query());Console.WriteLine("COMEDOR_HOME_RESTORED="+JsonSerializer.Serialize(Query()));return 0;}
  if(args[0]!="apply-home"||before.Home!=original.Home)throw new Exception("Unreviewed action or Home state");
  if(!Directory.Exists("/opt/usr/apps/YourDining"))throw new Exception("Target app not installed");
  try{SetHome(Target);var after=Query();SamePreferences(original,after);Console.WriteLine("COMEDOR_HOME_ROUTED="+JsonSerializer.Serialize(after));}
  catch{SetHome(original.Home);throw;}
  return 0;
 }catch(Exception e){Console.Error.WriteLine(e.ToString());return 1;}}
}
